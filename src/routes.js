const { addCatHandler, getAllCatsHandler, getCatByIdHandler, editCatByIdHandler, deleteCatByIdHandler } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/cats",
    handler: addCatHandler,
  },
  {
    method: "GET",
    path: "/cats",
    handler: getAllCatsHandler,
  },
  {
    method: "GET",
    path: "/cats/{catId}",
    handler: getCatByIdHandler,
  },
  {
    method: "PUT",
    path: "/cats/{catId}",
    handler: editCatByIdHandler,
  },
  {
    method: "DELETE",
    path: "/cats/{catId}",
    handler: deleteCatByIdHandler,
  },
];

module.exports = routes;
