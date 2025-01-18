async function upvoteIncident(req, res) {
    const { incidentId } = req.params;
    const userId = req.user._id;
  
    try {
      const incident = await Incident.findById(incidentId);
      if (!incident) {
        return res.status(404).json({ message: 'Incident not found' });
      }
  
      const newUpvote = {
        userId,
        createdAt: new Date(),
      };
  
      incident.upvotes.push(newUpvote);
      await incident.save();
  
      res.status(200).json({ message: 'Upvoted successfully', incident });
    } catch (error) {
      res.status(500).json({ message: 'Error upvoting incident', error });
    }
  }
  