using System;
using System.Collections.Generic;
using DigitalDisplayBO.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DigitalDisplayBO.API
{
    public partial class NetRomInternship2022OlandaDevContext : DbContext
    {
        public NetRomInternship2022OlandaDevContext()
        {
        }

        public NetRomInternship2022OlandaDevContext(DbContextOptions<NetRomInternship2022OlandaDevContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Advertisement> Advertisements { get; set; } = null!;
        public virtual DbSet<AdvertisementType> AdvertisementTypes { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Device> Devices { get; set; } = null!;
        public virtual DbSet<DevicePanel> DevicePanels { get; set; } = null!;
        public virtual DbSet<Panel> Panels { get; set; } = null!;
        public virtual DbSet<PanelAdvertisement> PanelAdvertisements { get; set; } = null!;
        public virtual DbSet<PanelLayout> PanelLayouts { get; set; } = null!;
        public virtual DbSet<PanelLayoutZone> PanelLayoutZones { get; set; } = null!;
        public virtual DbSet<PanelZone> PanelZones { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Advertisement>(entity =>
            {
                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TextFontColor).HasMaxLength(6);

                entity.Property(e => e.TextFontFamily).HasMaxLength(100);

                entity.Property(e => e.TextPadding).HasMaxLength(50);

                entity.Property(e => e.UpdatedDate).HasColumnType("datetime");

                entity.HasOne(d => d.AdvertisementType)
                    .WithMany(p => p.Advertisements)
                    .HasForeignKey(d => d.AdvertisementTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Advertisements_AdvertisementTypes");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Advertisements)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Advertisements_Categories");
            });

            modelBuilder.Entity<AdvertisementType>(entity =>
            {
                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Device>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.LatestRefresh).HasColumnType("datetime");

                entity.Property(e => e.Location).HasMaxLength(500);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.RegisteredByUser).HasMaxLength(250);
            });

            modelBuilder.Entity<DevicePanel>(entity =>
            {
                entity.Property(e => e.PanelSetByUser).HasMaxLength(250);

                entity.Property(e => e.StartDateTime).HasColumnType("datetime");

                entity.HasOne(d => d.Device)
                    .WithMany(p => p.DevicePanels)
                    .HasForeignKey(d => d.DeviceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DevicePanels_Devices");

                entity.HasOne(d => d.Panel)
                    .WithMany(p => p.DevicePanels)
                    .HasForeignKey(d => d.PanelId)
                    .HasConstraintName("FK_DevicePanels_Panels");
            });

            modelBuilder.Entity<Panel>(entity =>
            {
                entity.Property(e => e.BackgroundColor).HasMaxLength(6);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.HasOne(d => d.PanelLayout)
                    .WithMany(p => p.Panels)
                    .HasForeignKey(d => d.PanelLayoutId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Panels_PanelLayouts");
            });

            modelBuilder.Entity<PanelAdvertisement>(entity =>
            {
                entity.HasOne(d => d.Advertisement)
                    .WithMany(p => p.PanelAdvertisements)
                    .HasForeignKey(d => d.AdvertisementId)
                    .HasConstraintName("FK_PanelAdvertisements_Advertisements");

                entity.HasOne(d => d.PanelZone)
                    .WithMany(p => p.PanelAdvertisements)
                    .HasForeignKey(d => d.PanelZoneId)
                    .HasConstraintName("FK_PanelAdvertisements_PanelZones");
            });

            modelBuilder.Entity<PanelLayout>(entity =>
            {
                entity.Property(e => e.Columns).HasMaxLength(500);

                entity.Property(e => e.Description).HasMaxLength(500);

                entity.Property(e => e.Name).HasMaxLength(50);

                entity.Property(e => e.Rows).HasMaxLength(500);
            });

            modelBuilder.Entity<PanelLayoutZone>(entity =>
            {
                entity.HasOne(d => d.PanelLayout)
                    .WithMany(p => p.PanelLayoutZones)
                    .HasForeignKey(d => d.PanelLayoutId)
                    .HasConstraintName("FK_PanelLayoutZones_PanelLayouts");
            });

            modelBuilder.Entity<PanelZone>(entity =>
            {
                entity.Property(e => e.BackgroundColor).HasMaxLength(6);

                entity.HasOne(d => d.Panel)
                    .WithMany(p => p.PanelZones)
                    .HasForeignKey(d => d.PanelId)
                    .HasConstraintName("FK_PanelZones_Panels");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
