const categoryModel = require ('../models/category.model');

async function postCatagory (req, res) {
  try {
    const {category, type} = req.body;

    const categoryData = await categoryModel.create ({
      category,
      type,
    });

    return res.status (201).json ({
      success: true,
      message: 'catagory added sucessFully',
      category: categoryData.category,
      type: categoryData.type,
    });
  } catch (error) {
    console.log ('error in post-category function', error);
  }
}

async function getCategory (req, res) {
  try {
    const getCategoryData = await categoryModel.find ();
    res.status (200).json ({
      success: true,
      message: 'category get sucessFully',
      category: getCategoryData,
    });
  } catch (error) {
    return res.status (400).json ({
      message: 'internal server error',
    });
  }
}

async function deleteCategory (req, res) {
  try {
    const id = req.params.id;
   const deleteCategoryData =   await categoryModel.findByIdAndDelete (
      id,
    );

    if(!deleteCategoryData) {
        return res.status(404).json({
            message: "data not found",
        }

        )
    }

    return res.status (200).json ({
      success: true,
      message: 'deleted sucessFully',
    });
  } catch (err) {
    console.log(err)
    return res.status (400).json ({
      message: 'internal server error',
    });
  }
}


async function updateCategory(req, res) {
  try {
    const id = req.params.id;

    const { category, type } = req.body;

    const updateCategoryData = await categoryModel.findByIdAndUpdate(
      id,
      { category, type },
      { new: true, runValidators: true }
    );

    if (!updateCategoryData) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updateCategoryData,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {postCatagory, getCategory, deleteCategory,updateCategory};
