<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240502185059 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Ändere die Spalte 'img' auf TEXT anstelle von LONGTEXT
        $this->addSql('ALTER TABLE creator ADD img TEXT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // Lösche die Spalte 'img'
        $this->addSql('ALTER TABLE creator DROP img');
    }
}
