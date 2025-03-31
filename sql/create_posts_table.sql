-- Tabela para armazenar os posts agendados e publicados
CREATE TABLE IF NOT EXISTS posts (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  media JSON DEFAULT NULL,
  status ENUM('draft', 'scheduled', 'published', 'failed') NOT NULL,
  publish_type ENUM('immediate', 'scheduled') NOT NULL,
  scheduled_date DATETIME DEFAULT NULL,
  social_networks JSON NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  published_at DATETIME DEFAULT NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_scheduled_date (scheduled_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 