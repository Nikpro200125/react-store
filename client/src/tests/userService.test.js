import { getCakes, getCarouselItems } from "../services/userService";

test("getCarouselItems", async () => {
  const collection = {
    collection: [
      {
        id: "someId",
        cake: {
          url: "http://localhost/static/assets/some.png",
          name: "Some name",
          description: "Some description",
          price: 2100,
        },
      },
    ],
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(collection),
    })
  );
  const data = await getCarouselItems();
  expect(data).not.toBeNull();
  expect(data[0].cake.url).not.toBeNull();
  expect(data[0].id).not.toBeNull();
  expect(data[0].cake.description).not.toBeNull();
  expect(data[0].cake.name).not.toBeNull();
  expect(data[0].cake.price).not.toBeNull();
  global.fetch.mockRestore();
});

test("getCakes", async () => {
  const collection = {
    collection: [
      {
        id: "someId",
        cake: {
          url: "http://localhost/static/assets/some.png",
          name: "Some name",
          description: "Some description",
          price: 2100,
        },
      },
    ],
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(collection),
    })
  );
  const data = await getCakes("cake");
  expect(data).not.toBeNull();
  expect(data[0].cake.url).not.toBeNull();
  expect(data[0].id).not.toBeNull();
  expect(data[0].cake.description).not.toBeNull();
  expect(data[0].cake.name).not.toBeNull();
  expect(data[0].cake.price).not.toBeNull();
  global.fetch.mockRestore();
});
