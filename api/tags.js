const express = require("express");
const tagsRouter = express.Router();
const {getAllTags, getPostsByTagName} = require("../db");

tagsRouter.use((req, res, next)=>{
    console.log("A request is being made to /posts");
    next();
    });

    tagsRouter.get("/", async (req, res)=>{
        try {
            const tags = await getAllTags();
            res.send({
                tags,
            });
        } catch (error){
            throw error;
        }
    });

    tagsRouter.get('/:tagName/posts', async (req, res, next) => {
        // read the tagname from the params
        const { tagName } = req.params;
        
        try {
            const posts = await getPostsByTagName(tagName);
          // use our method to get posts by tag name from the db
          if(posts){
              res.send(posts);
          } else {
              next({
                  name: "getting post by tag error",
                  message: "no post",
              });
          }
        //   return posts;
          // send out an object to the client { posts: // the posts }
        } catch ({ name, message }) {
          // forward the name and message to the error handler
                    next({name, message});
        }
      });
    

    module.exports = tagsRouter;