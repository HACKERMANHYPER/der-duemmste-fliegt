<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240502194733 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Ändere die Spalte 'lifes' zu 'lives' und setze Standardwert und NOT NULL
        $this->addSql('ALTER TABLE creator RENAME COLUMN lifes TO lives');
        $this->addSql('ALTER TABLE creator ALTER COLUMN lives SET DEFAULT 3');
        $this->addSql('ALTER TABLE creator ALTER COLUMN lives SET NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // Setze die Änderungen im Down-Methoden rückgängig
        $this->addSql('ALTER TABLE creator ALTER COLUMN lives DROP NOT NULL');
        $this->addSql('ALTER TABLE creator ALTER COLUMN lives DROP DEFAULT');
        $this->addSql('ALTER TABLE creator RENAME COLUMN lives TO lifes');
    }
}
