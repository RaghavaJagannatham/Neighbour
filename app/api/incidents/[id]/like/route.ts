async function likeIncident(req, res) {
    const { incidentId } = req.params;
    const userId = req.user._id;
  
    try {
      const incident = await Incident.findById(incidentId);
      if (!incident) {
        return res.status(404).json({ message: 'Incident not found' });
      }
  
      const newLike = {
        userId,
        createdAt: new Date(),
      };
  
      incident.likes.push(newLike);
      await incident.save();
  
      res.status(200).json({ message: 'Liked successfully', incident });
    } catch (error) {
      res.status(500).json({ message: 'Error liking incident', error });
    }
  }
  