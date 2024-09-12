const Task = require("../../models/task.model");

// [GET] /tasks
module.exports.index = async (req, res) => {
  let find={
    deleted: false
  }
  //keyword
  let keyword=""
  if(req.query.keyword){
    const regex=new RegExp(req.query.keyword,"i");
    find.title=regex
  }
  //end keyword

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

    //pagination

    let limitItems=2
    if(req.query.limitItems){
      limitItems=parseInt(req.query.limitItems)
    }
    let page=1
    if(req.query.page){
      page=parseInt(req.query.page)
    }

    let skip=(page-1)*limitItems
    //end pagination
  const tasks = await Task
  .find(find)
  .limit(limitItems)
  .skip(skip)
  .sort(sort);

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