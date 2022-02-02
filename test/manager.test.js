const Manager = require('../routes/manager');

test("Can change the office number on the constructor", () => {
    const changedValue = "9999";
    const inter = new Intern("Reid", 1, "test@test.com", changedValue, "reid01");
    expect(inter.internSchool).toBe(changedValue);
  });
