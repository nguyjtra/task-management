const Task = require("../../models/task.model");

// [GET] /tasks
module.exports.index = async (req, res) => {
  let find={
    $or:[
      {createdBy:req.user.id},
      {listUser:req.user.id} 
    ],
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

module.exports.changeStatus=async(req,res)=>{
  try{
    const ids=req.body.ids;
    const status=req.body.status
    await Task.updateMany({
      _id:{$in:ids}
    },{
      status:status
    })
    res.json({
      message : "success"}
    )
  }
  catch(error){
    res.json({
      message:"fail"
    })
  }
}

module.exports.create=async(req,res)=>{
  try{
  req.body.createdBy=req.user.id
  let newTask=new Task(req.body)

  await newTask.save();
  res.json({
    message:"sucess",
    task:newTask
  })
  }
  catch(error){
    res.json({
      message:"fail"
    })
  }

}

module.exports.edit=async(req,res)=>{
  try {
    let id=req.params.id;
    const data=req.body
    await Task.updateOne({
      _id:id
    },req.body
    )
    res.json({
      message:"success"
    })

  } catch (error) {
    res.json({
      message:"error"
    })
  }
}

module.exports.delete=async(req,res)=>{
  try {
    await Task.updateMany({
      _id:{$in:req.body.ids}
    },{
      deleted:true
    })
    res.json({message:"success"})
  } catch (error) {
    res.json({message:"error"})
  }
  

}