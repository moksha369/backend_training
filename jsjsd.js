const { request } = require("http")












































test("PUT /id retorna 200", async () => {
    const response = await request
        .put(`${url}/${id}`)
        .send({
            nome: "Estudar para P1", 
            concluida: true });
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBe(id);
    });
