//create a function that can reformat the default date of sequelize
module.exports = {
  format_date: (date) => {
    return `${new Date(date).getMonth()+1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear()
    }`;
  },
};
