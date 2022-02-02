const Intern = require('../routes/intern');

test("Can change the School on the constructor", () => {
    const changedValue = "University of Washington";
    const inter = new Intern("Reid", 1, "test@test.com", changedValue);
    expect(inter.internSchool).toBe(changedValue);
  });
