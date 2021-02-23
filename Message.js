const Sequelize = require("sequelize");
// Load the database path
// const sequelize = require("../config/database");

  const Message = sequelize.define(
    'Message',
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
      TB_Conversation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiver_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reply_of_message_id: {
      	type: DataTypes.INTEGER,
        allowNull: false,
      }
      msg_content: {
      	type: DataTypes.STRING,
        allowNull: false,
      },
      is_selected: {
        type: DataTypes.BOOLEAN
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      viewed_on: {
        type: DataTypes.Date,
      },
    },
    {
      underscored: true,
      tableName: 'TB_Message',
      hooks: {},
    },
  );

  Message.associate = function (models) {
    Message.belongsTo(models.Conversation, {
      foreignKey: 'TB_Conversation_id',
      as: 'conversation',
    });
  };

  Conversation.fetch = async (key = null, columns = null) {
  	// key must correspond to column names and should be an object.
  	// columns must be an arrays with column names needed.
  	try {
  		let condition = {
  			include: {
  				model: Conversation.scope(null),
  				as: 'conversation',
  		},
  		};
  		if (key)
  			condition.where = key;

  		if (columns)
  			condition.attributes = columns;

  	  return await Message.findAll(condition);
  	} catch (e) {
  		return e;
  	}
  },

	Message.add = async (data) {
  	// data must be an object with column names and values.
  	try {
  		if (!data)
  			throw "Missing data values";

  	  return await Message.create(data);
  	} catch (e) {
  		return e;
  	}
  },
  return Message;
};
