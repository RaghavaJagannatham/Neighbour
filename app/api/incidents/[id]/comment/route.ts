const Incident = require('../models/Incident');

async function addComment(req, res) {
  const { incidentId } = req.params;
  const { text } = req.body;
  const userId = req.user._id; // Assuming you're using authentication to get the userId

  try {
    const incident = await Incident.findById(incidentId);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    const newComment = {
      userId,
      text,
      createdAt: new Date(),
    };

    incident.comments.push(newComment);
    await incident.save();

    res.status(200).json({ message: 'Comment added successfully', incident });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
}
