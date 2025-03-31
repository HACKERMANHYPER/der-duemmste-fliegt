<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240504135535 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Entferne den Foreign Key und den Index für answered_by_id
        $this->addSql('ALTER TABLE question DROP CONSTRAINT FK_B6F7494E2FC55A77');
        $this->addSql('DROP INDEX IF EXISTS IDX_B6F7494E2FC55A77');
        
        // Ändere die Spalte und füge eine 'used' Spalte hinzu
        $this->addSql('ALTER TABLE question ADD used BOOLEAN NOT NULL DEFAULT FALSE, DROP COLUMN answered_by_id, DROP COLUMN answer_correct');
    }

    public function down(Schema $schema): void
    {
        // Setze die Änderungen im Down-Methoden rückgängig
        $this->addSql('ALTER TABLE question ADD answered_by_id INT DEFAULT NULL, ADD answer_correct BOOLEAN DEFAULT NULL, DROP COLUMN used');
        
        // Füge den Foreign Key und den Index wieder hinzu
        $this->addSql('ALTER TABLE question ADD CONSTRAINT FK_B6F7494E2FC55A77 FOREIGN KEY (answered_by_id) REFERENCES creator (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_B6F7494E2FC55A77 ON question (answered_by_id)');
    }
}
