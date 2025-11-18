// API Service for backend communication
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Fetch all complaints from backend
 */
export async function fetchComplaints() {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints`);
    if (!response.ok) throw new Error('Failed to fetch complaints');
    return await response.json();
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw error;
  }
}

/**
 * Fetch single complaint by ID
 */
export async function fetchComplaintById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints/${id}`);
    if (!response.ok) throw new Error('Failed to fetch complaint');
    return await response.json();
  } catch (error) {
    console.error('Error fetching complaint:', error);
    throw error;
  }
}

/**
 * Create new complaint
 */
export async function createComplaint(complaintData) {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(complaintData),
    });
    if (!response.ok) throw new Error('Failed to create complaint');
    return await response.json();
  } catch (error) {
    console.error('Error creating complaint:', error);
    throw error;
  }
}

/**
 * Update complaint
 */
export async function updateComplaint(id, updates) {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update complaint');
    return await response.json();
  } catch (error) {
    console.error('Error updating complaint:', error);
    throw error;
  }
}

/**
 * Delete complaint
 */
export async function deleteComplaint(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete complaint');
    return await response.json();
  } catch (error) {
    console.error('Error deleting complaint:', error);
    throw error;
  }
}

/**
 * Vote on complaint (upvote or downvote)
 */
export async function voteOnComplaint(id, voteType) {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints/${id}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: voteType }), // 'up' or 'down'
    });
    if (!response.ok) throw new Error('Failed to vote');
    return await response.json();
  } catch (error) {
    console.error('Error voting:', error);
    throw error;
  }
}

/**
 * Get validation insights for a complaint
 */
export async function getValidationInsights(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints/${id}/validation`);
    if (!response.ok) throw new Error('Failed to fetch validation insights');
    return await response.json();
  } catch (error) {
    console.error('Error fetching validation insights:', error);
    throw error;
  }
}

/**
 * Analyze complaint text with train and price validation
 */
export async function analyzeComplaint(description, trainNumber = null, itemName = null) {
  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        trainNumber,
        itemName,
      }),
    });
    if (!response.ok) throw new Error('Failed to analyze complaint');
    return await response.json();
  } catch (error) {
    console.error('Error analyzing complaint:', error);
    throw error;
  }
}

/**
 * Get train information
 */
export async function getTrainInfo(trainNumber) {
  try {
    const response = await fetch(`${API_BASE_URL}/trains/${trainNumber}`);
    if (!response.ok) throw new Error('Train not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching train info:', error);
    throw error;
  }
}

/**
 * Get IRCTC menu price for item
 */
export async function getMenuPrice(itemName) {
  try {
    const response = await fetch(`${API_BASE_URL}/menu/${encodeURIComponent(itemName)}`);
    if (!response.ok) throw new Error('Item not found in menu');
    return await response.json();
  } catch (error) {
    console.error('Error fetching menu price:', error);
    throw error;
  }
}

/**
 * Health check
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error('Backend unhealthy');
    return await response.json();
  } catch (error) {
    console.error('Backend health check failed:', error);
    return { status: 'unhealthy', error: error.message };
  }
}
