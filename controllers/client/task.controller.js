const Task = require("../../models/task.model");

// [GET] /tasks
module.exports.index = async (req, res) => {
    let find={
        deleted: false
      }
    const status=req.query.status
    if(status){
        find.status=status
    }

    const sortKey=req.query.sortKey
    const sortValue=req.query.sortValue

    
    const sort={}
    if(sortKey && sortValue){
        sort[sortKey]=sortValue
    }
  const tasks = await Task.find(find).sort(sort);

  res.json(tasks);
}

// [GET] /tasks/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findOne({
      _id: id,
      deleted: false
    });

    res.json(task);
  } catch (error) {
    res.json({
      message: "Not Found"
    });
  }
}