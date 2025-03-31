<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240504005414 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Erstelle die Tabelle mit einer SERIAL ID-Spalte
        $this->addSql('CREATE TABLE global_setting (
            id SERIAL PRIMARY KEY, 
            name VARCHAR(255) NOT NULL, 
            value VARCHAR(255) DEFAULT NULL
        )');
    }

    public function down(Schema $schema): void
    {
        // Lösche die Tabelle im Down-Migrationsschritt
        $this->addSql('DROP TABLE global_setting');
    }
}
