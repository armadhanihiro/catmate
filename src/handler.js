const cats = require("./cats");
const { nanoid } = require("nanoid");

const addCatHandler = (request, h) => {
  const { jenis, tinggi, berat, warna, vaksin } = request.payload;

  const id = nanoid(16);

  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newCat = {
    id,
    jenis,
    tinggi,
    berat,
    warna,
    vaksin,
    insertedAt,
    updatedAt,
  };

  cats.push(newCat);
};

const getAllCatsHandler = () => ({
  // return {
  //   status: "success",
  //   data: {
  //     cats,
  //   },
  // };
  status: "success",
  data: {
    cats: cats.map((cat) => ({
      id: cat.id,
      jenis: cat.jenis,
      warna: cat.warna,
      tinggi: cat.tinggi,
      berat: cat.berat,
      vaksin: cat.vaksin,
    })),
  },
});

const getCatByIdHandler = (request, h) => {
  const { catId } = request.params;

  const cat = cats.filter((n) => n.id === catId)[0];

  if (cat !== undefined) {
    return {
      status: "success",
      data: {
        cat,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Kucing tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editCatByIdHandler = (request, h) => {
  const { catId } = request.params;

  const { jenis, tinggi, berat, warna, vaksin } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = cats.findIndex((cat) => cat.id === catId);

  if (index !== -1) {
    cats[index] = {
      ...cats[index],
      id,
      jenis,
      tinggi,
      berat,
      warna,
      vaksin,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Kucing berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui kucing. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteCatByIdHandler = (request, h) => {
  const { catId } = request.params;

  const index = cats.findIndex((cat) => cat.id === catId);

  if (index !== -1) {
    cats.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Kucing berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Kucing gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = { addCatHandler, getAllCatsHandler, getCatByIdHandler, editCatByIdHandler, deleteCatByIdHandler };
