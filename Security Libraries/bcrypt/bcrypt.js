const bcrypt = require("bcrypt");

async function hashPasswords() {
  const password01 = "ksdajl@kasd^$";
  const password02 = "password";
  const password03 = "asdhkIhateYou";
  const password04 = "J3sus";
  const password05 = "Wh0!am";

  const saltRounds = 10;

  const hash01 = await bcrypt.hash(password01, saltRounds);
  const hash02 = await bcrypt.hash(password02, saltRounds);
  const hash03 = await bcrypt.hash(password03, saltRounds);
  const hash04 = await bcrypt.hash(password04, saltRounds);
  const hash05 = await bcrypt.hash(password05, saltRounds);

  console.log("---------- Hash ----------")

  console.log(password01, ":", hash01);
  console.log(password02, ":", hash02);
  console.log(password03, ":", hash03);
  console.log(password04, ":", hash04);
  console.log(password05, ":", hash05);

  const comp01 = await bcrypt.compare(password01, hash01)
  const comp02 = await bcrypt.compare(password02, hash02)
  const comp03 = await bcrypt.compare(password03, hash03)
  const comp04 = await bcrypt.compare(password04, hash04)
  const comp05 = await bcrypt.compare(password05, hash05);

  console.log("---------- Compare ----------");

  console.log(comp01)
  console.log(comp02)
  console.log(comp03)
  console.log(comp04)
  console.log(comp05);
}

hashPasswords();
