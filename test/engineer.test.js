const Engineer = require('../routes/engineer');

test("Can add GitHub account to the constructor", () => {
    const changedValue = "githubaccount";
    const engi = new Engineer("Reid", 1, "test@test.com", changedValue);
    expect(engi.engineerGithub).toBe(changedValue);
  });