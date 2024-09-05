export default {
	createHash: (password) => {
		return dcodeIO.bcrypt.hashSync(password, 10);
	},
	verifyHash: (password, hash) => {
		return dcodeIO.bcrypt.compareSync(password, hash)
	}
}
