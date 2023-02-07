using System;
using System.Collections.Generic;
using DigitalDisplayBO.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DigitalDisplayBO.API
{
    public partial class DigitalDisplayDBContext : DbContext
    {
        public DigitalDisplayDBContext()
        {
        }

        public DigitalDisplayDBContext(DbContextOptions<DigitalDisplayDBContext> options)
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
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=LAPTOP-VRLK5JVV\\SQLEXPRESS;Initial Catalog=DigitalDisplayDB;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Advertisement>(entity =>
            {
                entity.Property(e => e.BirthdayData).HasMaxLength(50);

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.GraphicalContent).HasMaxLength(10);

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
                    .OnDelete(DeleteBehavior.ClientSetNull)
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

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("Role");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(15);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(200);

                entity.Property(e => e.FirstName).HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.Password).HasMaxLength(50);

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.IdRole)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Role");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
