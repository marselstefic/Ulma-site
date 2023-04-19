module.exports = class API {
    static async fetchAllPost(req, res){
        res.send("Hello from API");
    }

    static async fetchPostById(req, res){
        res.send("Hello from API");
    }

    static async createPost(req, res){
        res.send("create");
    }

    static async updatePost(req, res){
        res.send("update");
    }

    static async DeletePost(req, res){
        res.send("delete");
    }
}