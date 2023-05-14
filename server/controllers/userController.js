import User from '../models/User.js';

export async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getUserByName(req, res) {
  try {
    
    const user = await User.findOne({
      name: { $regex: new RegExp(req.params.name, 'i') }
    });
    console.log(user, req.params.name)
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function createUser(req, res) {
  try {
    // const user = new User(req.body);
    // await user.save();
    // res.json(user);
    console.log(req.method)
    res.json(req.body)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// export async function updateUser(req, res) {
//   try {
//     const user = await findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }

// export async function deleteUser(req, res) {
//   try {
//     await findByIdAndDelete(req.params.id);
//     res.json({ message: 'User deleted' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// }
