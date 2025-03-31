<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240502183311 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Erstelle die Tabelle 'creator' mit einem SERIAL Primary Key
        $this->addSql('CREATE TABLE creator (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL)');

        // Erstelle die Tabelle 'question' mit einem SERIAL Primary Key
        $this->addSql('CREATE TABLE question (id SERIAL PRIMARY KEY, answered_by_id INT DEFAULT NULL, text TEXT NOT NULL, answer TEXT NOT NULL, answer_correct BOOLEAN DEFAULT NULL)');

        // Füge den Fremdschlüssel-Constraint hinzu
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494E2FC55A77 FOREIGN KEY (answered_by_id) REFERENCES creator (id) ON DELETE SET NULL');
    }

    public function down(Schema $schema): void
    {
        // Lösche den Fremdschlüssel-Constraint
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494E2FC55A77');

        // Lösche die Tabellen 'creator' und 'question'
        $this->addSql('DROP TABLE creator');
        $this->addSql('DROP TABLE question');
    }
}
