const categoryModel = require('../models/category.model');
const transactionModel = require ('../models/transaction.model');

async function crateTransation(req, res) {
  try {
    const { amount, type, category } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!amount || Number(amount) <= 0 || !type || !category) {
      return res.status(400).json({
        success: false,
        message: "Amount, type and category are required",
      });
    }

    const categoryData = await categoryModel.findOne({
      _id: category,
      type: type,
    });

    if (!categoryData) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const transation = await transactionModel.create({
      user: userId,
      amount: Number(amount),
      type,
      category: categoryData._id,
    });

    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transation: {
        _id: transation._id,
        user: transation.user,
        amount: transation.amount,
        type: transation.type,
        category: transation.category,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

async function getTransactions (req, res) {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status (404).json ({
        message: 'user not found',
      });
    }

    const transactions = await transactionModel
      .find ({user: userId})
      .populate ('category', 'category type')
      .sort ({date: -1});

    return res.status (200).json ({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.log (error);

    return res.status (500).json ({
      success: false,
      message: 'Internal Server Error',
    });
  }
}



async function deleteOneTransation(req, res) {
  try {
    const userId = req.user.id;
    const id = req.params.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const findId = await transactionModel.findOne({
      _id: id,
      user: userId,
    });

    if (!findId) {
      return res.status(404).json({
        success: false,
        message: "Transaction ID not found",
      });
    }

    await transactionModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}




async function summary(req, res) {
  try {
    const userId = req.user.id;

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const transactions = await transactionModel.find({
      user: userId,
      createdAt: {
        $gte: last30Days,
      },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += Number(transaction.amount);
      }

      if (transaction.type === "expense") {
        totalExpense += Number(transaction.amount);
      }
    });

    const balance = totalIncome - totalExpense;

    return res.status(200).json({
      sucess: true,
      summary: {
        balance,
        totalIncome,
        totalExpense,
        totalTransation: transactions.length,
      },
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      sucess: false,
      message: "Internal server error",
    });
  }
}



module.exports = {
  crateTransation,
  getTransactions,
 
  deleteOneTransation,
  
  summary
};
