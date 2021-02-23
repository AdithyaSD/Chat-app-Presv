const Sequelize = require("sequelize");
// Load the database path
// const sequelize = require("../config/database");

  const Conversation = sequelize.define(
    'Conversation',
    {
      created_by: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
      },
       updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status_enum: {
        type: DataTypes.ENUM,
        values: [],
      },
      initiated_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiver_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      TB_Xolution_Problem_id: {
      	type: DataTypes.INTEGER,
        allowNull: false,
      }
      worth: {
      	type: DataTypes.INTEGER,
      },
    },
    {
      underscored: true,
      tableName: 'TB_Conversation',
      hooks: {},
    },
  );

  Conversation.associate = function (models) {
    Conversation.hasMany(models.Message, {
      foreignKey: 'TB_Conversation_id',
      as: 'messages',
    });
  };

  Conversation.fetch = async (key = null, columns = null) {
  	// key must correspond to column names and should be an object.
  	// columns must be an arrays with column names needed.
  	try {
  		let condition = {
  			include: {
  				model: Message.scope(null),
  				as: 'messages',
  				attributes: '',
  		},
  		};
  		if (key)
  			condition.where = key;

  		if (columns)
  			condition.attributes = columns;

  	  return await Conversation.findAll(condition);
  	} catch (e) {
  		return e;
  	}
  },

	Conversation.add = async (data) {
  	// data must be an object with column names and values.
  	try {
  		if (!data)
  			throw "Missing data values";

  	  return await Conversation.create(data);
  	} catch (e) {
  		return e;
  	}
  },
  return Conversation;
};
