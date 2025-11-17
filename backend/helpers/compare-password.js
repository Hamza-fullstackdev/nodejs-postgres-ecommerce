import bcrypt from "bcryptjs";

export const comparePassword = async (password, encryptedPassword) => {
  return await bcrypt.compare(password, encryptedPassword);
};
