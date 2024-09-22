# Use the official Python image.
FROM python:3.9-slim

# Set the working directory inside the container.
WORKDIR /app

# Copy requirements.txt and install dependencies.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code.
COPY . .

# Expose the application port (Cloud Run uses port 8080).
EXPOSE 8080

# Command to run the application.
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8080"]