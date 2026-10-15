import express from "express";

const app = express(); 
app.use(express.json());

let pets = [
    {idPet: 1, dsNome: "Rex", dsEspecie: "cachorro", nuIdade: 3, fgAdotado: false},

    {idPet: 2, dsNome: "lyca", dsEspecie: "cachorro", nuIdade: 2, fgAdotado: true},

    {idPet: 3, dsNome:"lulu", dsEspecie: "gato", nuIdade: 1, fgAdotado: true}

]

let ultimoId = 1

app.get("/pets", function (req, res) {
    res.send("Seja bem vindo(a) a adoção de pets")
});



app.get("/pets", function(req,res) {
    //segundo pilar: rotas
    res.json(pets)
});

app.get("/pets/:id", (req, res) => {const id = parseInt(req.params.id);

    if(isNaN(id)) {
        return res.status(400).json({mensagem: "Identificador deve ser um numero"});
    }

    let pet = pets.find((pet) => {
        return pet.idPet === id;
    });

    if (pet === undefined) {
        return res.status(404).json({mensagem: "animal não encontrado ou indisponivel"});
    }

    let array = [pet];
    res.json(array);
});

app.post("/pets", (req, res) => {
    let idade_pet = req.body.nuIdade;
    let nome_pet = req.body.dsNome;
    let especie_pet = req.body.dsEspecie

    console.log(req.body);

    if (!idade_pet || !nome_pet || !especie_pet) {
        return res.status(400).json({mensagem: "dados faltando, verifique nome, idade e especie"});
    }

    let novoId = ultimoId + 1;
    ultimoId++;

    let novo_pet = {
        idPet: novoId,
        dsNome: nome_pet,
        dsEspecie: especie_pet,
        nuIdade:idade_pet,
        fgAdotado: true
    }

    pets.push(novo_pet)

    res.status(201).json(novo_pet);
});

app.delete("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json({ mensagem: "identificador deve ser um numero" });
  }

  let index_pets = pets.findIndex((pet) => {
    return pet.idLivro === id;
  });

  if (index_pets === -1) {
    return res.status(404).send();
  }

  livros.splice(index_pets, 1);

  res.sendStatus(204);
});

app.patch("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idade_pet = req.body.nuIdade;

  if (isNaN(id)) {
    return res
      .status(400)
      .json({ mensagem: "identificador precisa ser um numero valido" });
  }

  let index_pets = pets.findIndex((pet) => {
    return pet.idPet === id;
  });

  if (index_pets === -1) {
    return res.sendStatus(404);
  }

  let pet_atualizar = pets[index_pets];

  if (idade_pet !== undefined) {
    pet_atualizar.nuIdade = idade_pet;
  }
  res.sendStatus(204);
});


app.listen(3000); //definir a porta terceiro pilar: porta a ser ouvida