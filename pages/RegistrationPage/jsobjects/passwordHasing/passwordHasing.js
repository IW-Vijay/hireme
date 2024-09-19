export default {
	createHash: (password) => {
  dcodeIO.bcrypt.setRandomFallback((len) => {
    const randomBytes = [];
    for (let i = 0; i < len; i++) {
      randomBytes.push(Math.floor(Math.random() * 256));
    }
    return randomBytes;
  });
  return dcodeIO.bcrypt.hashSync(password, 10);
},
	verifyHash: (password, hash) => {
		return dcodeIO.bcrypt.compareSync(password, hash)
	}
}