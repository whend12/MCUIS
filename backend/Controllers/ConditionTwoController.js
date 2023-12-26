import Condition from "../Models/ConditionTwoModel.js";

export const CreateCondition = async (req, res) => {
  try {
    const condition = await Condition.create(req.body);
    res.json(condition);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const GetAllCondition = async (req, res) => {
  try {
    const condition = await Condition.findAll();
    res.json(condition);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const GetConditionById = async (req, res) => {
  try {
    const condition = await Condition.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(condition[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const UpdateCondition = async (req, res) => {
  try {
    await Condition.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Condition Updated",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const DeleteCondition = async (req, res) => {
  try {
    await Condition.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Condition Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getConditionByUserId = async (req, res) => {
  try {
    const condition = await Condition.findAll({
      where: {
        UserId: req.params.id,
      },
    });
    res.json(condition);
  } catch (error) {
    res.json({ message: error.message });
  }
};
