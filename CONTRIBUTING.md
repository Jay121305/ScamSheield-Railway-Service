# Contributing to ScamShield Rail

Thank you for your interest in contributing to ScamShield Rail! This document provides guidelines and instructions for contributing to this multi-language project.

## 🌟 Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features or enhancements
- 📝 Improve documentation
- 🔧 Submit bug fixes
- ✨ Add new features
- 🧪 Write tests
- 🎨 Improve UI/UX

## 🚀 Getting Started

### Prerequisites

Before contributing, ensure you have:
- Node.js 18+
- Python 3.8+
- Go 1.21+ (optional)
- Git
- A code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
```bash
git clone https://github.com/YOUR_USERNAME/ScamSheield-Railway-Service.git
cd ScamSheield-Railway-Service
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/Jay121305/ScamSheield-Railway-Service.git
```

### Set Up Development Environment

1. **Install frontend dependencies:**
```bash
npm install
```

2. **Install Python backend dependencies:**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

3. **Install Go file service dependencies (optional):**
```bash
cd file-service
go mod download
cd ..
```

4. **Copy environment template:**
```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

5. **Start all services:**

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Python Backend:**
```bash
cd backend
python app.py
```

**Terminal 3 - Go File Service (optional):**
```bash
cd file-service
go run main.go
```

## 📋 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or fixes
- `chore/` - Maintenance tasks

### 2. Make Your Changes

#### Frontend (JavaScript/React)

- Follow React best practices
- Use functional components and hooks
- Add PropTypes for all components
- Keep components small and focused
- Use Tailwind CSS for styling
- Ensure dark mode compatibility

**Example component:**
```javascript
import PropTypes from 'prop-types';

function MyComponent({ title, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded"
    >
      {title}
    </button>
  );
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MyComponent;
```

#### Backend (Python/Flask)

- Follow PEP 8 style guide
- Add docstrings to functions
- Handle errors gracefully
- Use type hints where appropriate
- Add CORS headers for new endpoints

**Example endpoint:**
```python
@app.route('/api/example', methods=['POST'])
def example_endpoint():
    """
    Example API endpoint.
    
    Returns:
        JSON response with data
    """
    try:
        data = request.get_json()
        # Process data
        return jsonify({'success': True, 'data': data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

#### File Service (Go)

- Follow Go conventions
- Add comments for exported functions
- Handle errors explicitly
- Use proper HTTP status codes

**Example handler:**
```go
// HandleExample processes example requests
func HandleExample(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    
    if r.Method != http.MethodPost {
        http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
        return
    }
    
    // Process request
    json.NewEncoder(w).Encode(map[string]string{
        "status": "success",
    })
}
```

### 3. Test Your Changes

#### Frontend Tests
```bash
npm run test
npm run lint
npm run build
```

#### Backend Tests
```bash
cd backend
python -m pytest
flake8 .
```

#### Go Tests
```bash
cd file-service
go test ./...
go vet ./...
```

### 4. Commit Your Changes

Follow conventional commit messages:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test additions or changes
- `chore`: Build/tooling changes

**Examples:**
```bash
git commit -m "feat(frontend): add complaint filtering by category"
git commit -m "fix(backend): correct price extraction regex pattern"
git commit -m "docs(readme): update installation instructions"
```

### 5. Push and Create Pull Request

1. **Push your branch:**
```bash
git push origin feature/your-feature-name
```

2. **Create Pull Request on GitHub:**
   - Go to your fork on GitHub
   - Click "Compare & pull request"
   - Fill in the PR template
   - Link any related issues

3. **PR Title Format:**
```
[Type] Brief description
```

Examples:
- `[Feature] Add complaint export to CSV`
- `[Fix] Resolve theme toggle issue`
- `[Docs] Update API documentation`

## 🔍 Code Review Process

1. All PRs require at least one approval
2. CI/CD checks must pass
3. Code must follow project conventions
4. Tests must be included for new features
5. Documentation must be updated if needed

### Review Checklist

- [ ] Code follows project style guidelines
- [ ] PropTypes/type hints added
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No console errors in browser
- [ ] Dark mode works correctly
- [ ] CORS configured for new endpoints
- [ ] Error handling implemented
- [ ] Security considerations addressed

## 🐛 Reporting Bugs

### Before Submitting

1. Check existing issues
2. Search closed issues
3. Try latest version
4. Reproduce the bug

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node.js: [e.g., 18.17.0]
- Python: [e.g., 3.11.0]
```

## 💡 Suggesting Features

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Screenshots, mockups, examples
```

## 📚 Documentation

### Update Documentation When:

- Adding new features
- Changing API endpoints
- Modifying configuration
- Adding dependencies
- Changing deployment process

### Documentation Locations:

- `README.md` - Main project documentation
- `CONTRIBUTING.md` - This file
- Inline code comments
- API endpoint docstrings
- Component PropTypes

## 🧪 Testing Guidelines

### Frontend Testing

- Test all user interactions
- Verify dark/light mode
- Check mobile responsiveness
- Test error states
- Validate form inputs

### Backend Testing

- Test all API endpoints
- Verify error handling
- Check CORS headers
- Validate input sanitization
- Test edge cases

### Integration Testing

- Test complete user flows
- Verify frontend-backend communication
- Check file upload process
- Test analysis functionality

## 🎨 Style Guidelines

### JavaScript/React

- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons
- Use arrow functions
- Destructure props
- Use meaningful variable names

### Python

- Follow PEP 8
- Use 4 spaces for indentation
- Use snake_case for variables
- Use docstrings
- Type hints recommended

### Go

- Run `go fmt`
- Follow Go conventions
- Use camelCase
- Export important functions
- Add comments for exported items

## 🔐 Security

### Report Security Vulnerabilities

**DO NOT** create public issues for security vulnerabilities.

Instead:
1. Email security concerns privately
2. Include detailed description
3. Provide reproduction steps
4. Allow time for fix before disclosure

### Security Best Practices

- Never commit secrets or API keys
- Use environment variables
- Validate all user inputs
- Sanitize file uploads
- Use HTTPS in production
- Keep dependencies updated

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📞 Getting Help

- Open a discussion on GitHub
- Ask questions in issues
- Review existing documentation
- Check closed issues/PRs

## 🎯 Priority Areas

Current priority areas for contribution:

1. **Database Integration**: Replace in-memory storage with PostgreSQL/MongoDB
2. **Authentication**: Add JWT-based user authentication
3. **Testing**: Increase test coverage
4. **Mobile App**: React Native companion app
5. **Analytics Dashboard**: Admin analytics and reporting
6. **Email Notifications**: Alert system for complaint updates
7. **Payment Integration**: If monetization needed
8. **Localization**: Multi-language support (Hindi, Tamil, etc.)

---

Thank you for contributing to ScamShield Rail! 🚂🛡️
