const {Cafe} = require('../model');
const {Brand} = require('../model');

exports.CafeList = async (req, res) => {
    try {
      const result = await Cafe.findAll({});
      res.json(result);
    } catch (e) {
      res.status(404).send("not found");
    }
  }

exports.CafeDoneList = async (req, res) => {
  try {
    const result = await Cafe.findAll({ where: { status: 'DONE' }});
    res.json(result);
  } catch (e) {
    res.status(404).send("not found");
  }
}

exports.CafeAdd = async (req, res) => {
  try {
    const { brandId,location, name, operatingtimeS ,operatingtimeE,content} = req.body;
    const group = await Brand.findByPk(brandId);
    //없는 그룹의 번호면 할일 추가 안함
    if(!group)
    {
      throw new Error("Error");
    }
    const ret = await Cafe.create({
      location : location,
      name : name,
      operatingtimeS : operatingtimeS,
      operatingtimeE : operatingtimeE,
      content : content,
    }, {logging: false});

    await group.addCafe(ret);
    const newData = ret.dataValues;
    console.log(newData);
    console.log('Create success');
    res.send(newData);
  }
  catch (error) {
    console.log('Error : ', error);
    res.json("할일 add 실패");
  }
}

exports.CafeDone = async (req, res) => {
  try {
    const { title } = req.body;
    let result = await Cafe.update(
        { status: 'DONE' },
        { where: { title: title }});
    console.log('Modify success :', title , "noDONE -> DONE");
    res.send("업데이트 성공");
  }
  catch (error) {
    console.log('Error :', error);
    res.json("끝낸 일로 업데이트 실패");
  }
}