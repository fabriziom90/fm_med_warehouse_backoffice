const login = (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)

    res.send('Login');
}

module.exports = {
    login
}