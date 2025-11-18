import { VALIDATION_THRESHOLDS, VALIDATION_BADGES } from '../constants.js';

/**
 * Calculate net votes for a complaint
 * @param {number} upvotes 
 * @param {number} downvotes 
 * @returns {number} Net vote count
 */
export function calculateNetVotes(upvotes = 0, downvotes = 0) {
  return upvotes - downvotes;
}

/**
 * Get validation status based on vote thresholds
 * @param {number} netVotes 
 * @returns {Object} Validation status
 */
export function getValidationStatus(netVotes) {
  if (netVotes >= VALIDATION_THRESHOLDS.MODERATOR_REVIEW) {
    return {
      level: 'moderator_review',
      label: 'Moderator Review Required',
      badge: VALIDATION_BADGES.VERIFIED,
      autoEscalate: true
    };
  }
  
  if (netVotes >= VALIDATION_THRESHOLDS.ESCALATED) {
    return {
      level: 'escalated',
      label: 'Auto-Escalated',
      badge: VALIDATION_BADGES.TRENDING,
      autoEscalate: true
    };
  }
  
  if (netVotes >= VALIDATION_THRESHOLDS.VERIFIED) {
    return {
      level: 'verified',
      label: 'Community Verified',
      badge: VALIDATION_BADGES.VERIFIED,
      autoEscalate: false
    };
  }
  
  if (netVotes <= VALIDATION_THRESHOLDS.DISPUTED) {
    return {
      level: 'disputed',
      label: 'Disputed Complaint',
      badge: VALIDATION_BADGES.DISPUTED,
      autoEscalate: false
    };
  }
  
  return {
    level: 'pending',
    label: 'Pending Validation',
    badge: null,
    autoEscalate: false
  };
}

/**
 * Check if user is a trusted reporter
 * @param {number} validatedReports 
 * @returns {boolean}
 */
export function isTrustedReporter(validatedReports = 0) {
  return validatedReports >= VALIDATION_THRESHOLDS.TRUSTED_USER;
}

/**
 * Calculate trust score for a complaint
 * @param {Object} complaint 
 * @returns {Object} Trust score details
 */
export function calculateTrustScore(complaint) {
  const { upvotes = 0, downvotes = 0, evidenceUrl, geolocation } = complaint;
  
  let score = 50; // Base score
  const factors = [];
  
  // Vote ratio
  const totalVotes = upvotes + downvotes;
  if (totalVotes > 0) {
    const ratio = upvotes / totalVotes;
    const voteScore = ratio * 30;
    score += voteScore;
    factors.push({ factor: 'Vote Ratio', impact: voteScore.toFixed(1) });
  }
  
  // Evidence provided
  if (evidenceUrl) {
    score += 15;
    factors.push({ factor: 'Photo Evidence', impact: '+15' });
  }
  
  // Location provided
  if (geolocation) {
    score += 10;
    factors.push({ factor: 'GPS Location', impact: '+10' });
  }
  
  // Volume of votes
  if (totalVotes >= 20) {
    score += 10;
    factors.push({ factor: 'High Engagement', impact: '+10' });
  }
  
  // Trusted reporter bonus (if applicable)
  if (complaint.user?.trustedReporter) {
    score += 15;
    factors.push({ factor: 'Trusted Reporter', impact: '+15' });
  }
  
  return {
    score: Math.min(Math.max(score, 0), 100), // Clamp between 0-100
    rating: score >= 80 ? 'High' : score >= 60 ? 'Medium' : score >= 40 ? 'Low' : 'Very Low',
    factors
  };
}

/**
 * Get similar complaints for cross-validation
 * @param {Object} complaint 
 * @param {Array} allComplaints 
 * @returns {Array} Similar complaints
 */
export function findSimilarComplaints(complaint, allComplaints) {
  const similar = [];
  
  for (const other of allComplaints) {
    if (other.id === complaint.id) continue;
    
    let similarity = 0;
    
    // Same train
    if (other.trainNo === complaint.trainNo) similarity += 30;
    
    // Same vendor
    if (other.vendorName?.toLowerCase() === complaint.vendorName?.toLowerCase()) {
      similarity += 25;
    }
    
    // Same item
    if (other.itemName?.toLowerCase() === complaint.itemName?.toLowerCase()) {
      similarity += 20;
    }
    
    // Similar price issue
    if (Math.abs((other.reportedPrice || 0) - (complaint.reportedPrice || 0)) < 10) {
      similarity += 15;
    }
    
    // Same category (if available)
    if (other.category === complaint.category) similarity += 10;
    
    if (similarity >= 40) {
      similar.push({
        ...other,
        similarityScore: similarity
      });
    }
  }
  
  return similar.sort((a, b) => b.similarityScore - a.similarityScore);
}

/**
 * Generate validation insights
 * @param {Object} complaint 
 * @param {Array} similarComplaints 
 * @returns {Object} Validation insights
 */
export function generateValidationInsights(complaint, similarComplaints) {
  const netVotes = calculateNetVotes(complaint.upvotes, complaint.downvotes);
  const validationStatus = getValidationStatus(netVotes);
  const trustScore = calculateTrustScore(complaint);
  
  const insights = {
    validationStatus,
    trustScore,
    netVotes,
    similarComplaintsCount: similarComplaints.length,
    recommendations: []
  };
  
  // Generate recommendations
  if (validationStatus.level === 'disputed') {
    insights.recommendations.push('⚠️ This complaint has more downvotes than upvotes. Review carefully.');
  }
  
  if (similarComplaints.length >= 3) {
    insights.recommendations.push(`✓ ${similarComplaints.length} similar complaints found - pattern detected!`);
  }
  
  if (!complaint.evidenceUrl) {
    insights.recommendations.push('📷 Photo evidence would strengthen this complaint.');
  }
  
  if (trustScore.score >= 80) {
    insights.recommendations.push('⭐ High trust score - reliable complaint.');
  }
  
  if (validationStatus.autoEscalate) {
    insights.recommendations.push(`🚨 Auto-escalated: ${validationStatus.label}`);
  }
  
  return insights;
}

/**
 * Format validation badge for display
 * @param {Object} badge 
 * @returns {string} HTML-safe badge string
 */
export function formatValidationBadge(badge) {
  if (!badge) return '';
  return `${badge.icon} ${badge.label}`;
}
