// Define Job Schema with Reference to User
const JobSchema = new mongoose.Schema(
    {
        // Define job schema fields
      createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',// Reference to the User model
      },
    },
    { timestamps: true }
  );