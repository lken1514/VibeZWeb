﻿// <auto-generated />
using System;
using BusinessObjects;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BusinessObjects.Migrations
{
    [DbContext(typeof(VibeZDbContext))]
    [Migration("20241104174247_udUPackage")]
    partial class udUPackage
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BusinessObjects.Album", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<Guid?>("ArtistId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("date")
                        .HasDefaultValue(new DateOnly(2024, 11, 4));

                    b.Property<DateOnly>("DateOfRelease")
                        .HasColumnType("date");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Nation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.HasIndex("ArtistId");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("BusinessObjects.Artist", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<DateOnly>("CreateDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("date")
                        .HasDefaultValue(new DateOnly(2024, 11, 4));

                    b.Property<string>("Genre")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("ImgBackground")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Nation")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.ToTable("Artists");
                });

            modelBuilder.Entity("BusinessObjects.BlockedArtist", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ArtistId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .HasColumnType("date");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.Property<DateTime>("blocked_date")
                        .HasColumnType("datetime2");

                    b.HasKey("UserId", "ArtistId");

                    b.HasIndex("ArtistId");

                    b.ToTable("BlockedArtists");
                });

            modelBuilder.Entity("BusinessObjects.Category", b =>
                {
                    b.Property<Guid>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .HasColumnType("date");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("BusinessObjects.Feature", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .HasColumnType("date");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("Id");

                    b.ToTable("Features");
                });

            modelBuilder.Entity("BusinessObjects.Follow", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ArtistId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .HasColumnType("date");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("UserId", "ArtistId");

                    b.HasIndex("ArtistId");

                    b.ToTable("Follows");
                });

            modelBuilder.Entity("BusinessObjects.Library", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<DateOnly>("CreateDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("date")
                        .HasDefaultValue(new DateOnly(2024, 11, 4));

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Libraries");
                });

            modelBuilder.Entity("BusinessObjects.Library_Album", b =>
                {
                    b.Property<Guid>("LibraryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AlbumId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("date")
                        .HasDefaultValue(new DateOnly(2024, 11, 4));

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("LibraryId", "AlbumId");

                    b.HasIndex("AlbumId");

                    b.ToTable("Library_Albums");
                });

            modelBuilder.Entity("BusinessObjects.Library_Artist", b =>
                {
                    b.Property<Guid>("LibraryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ArtistId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("date")
                        .HasDefaultValue(new DateOnly(2024, 11, 4));

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("LibraryId", "ArtistId");

                    b.HasIndex("ArtistId");

                    b.ToTable("Library_Artists");
                });

            modelBuilder.Entity("BusinessObjects.Library_Playlist", b =>
                {
                    b.Property<Guid>("LibraryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PlaylistId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("date")
                        .HasDefaultValue(new DateOnly(2024, 11, 4));

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("LibraryId", "PlaylistId");

                    b.HasIndex("PlaylistId");

                    b.ToTable("Library_Playlists");
                });

            modelBuilder.Entity("BusinessObjects.Like", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TrackId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .HasColumnType("date");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("UserId", "TrackId");

                    b.HasIndex("TrackId");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("BusinessObjects.Package", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .HasColumnType("date");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Number_of_acc")
                        .HasColumnType("int");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.Property<double>("price")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("Packages");
                });

            modelBuilder.Entity("BusinessObjects.Package_features", b =>
                {
                    b.Property<Guid>("PackId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("FeatureId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .HasColumnType("date");

                    b.Property<Guid?>("PackageId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("PackId", "FeatureId");

                    b.HasIndex("FeatureId");

                    b.HasIndex("PackageId");

                    b.ToTable("P_features");
                });

            modelBuilder.Entity("BusinessObjects.Payment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Amount")
                        .HasColumnType("float");

                    b.Property<DateOnly>("CreateDate")
                        .HasColumnType("date");

                    b.Property<string>("Payment_method")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Payments");
                });

            modelBuilder.Entity("BusinessObjects.Playlist", b =>
                {
                    b.Property<Guid>("PlaylistId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<DateOnly>("CreateDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("date")
                        .HasDefaultValue(new DateOnly(2024, 11, 4));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.Property<Guid?>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("createBy")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("PlaylistId");

                    b.HasIndex("UserId");

                    b.ToTable("Playlists");
                });

            modelBuilder.Entity("BusinessObjects.Track", b =>
                {
                    b.Property<Guid>("TrackId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<Guid?>("AlbumId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("ArtistId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("CategoryId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("date")
                        .HasDefaultValue(new DateOnly(2024, 11, 4));

                    b.Property<string>("Genre")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<int>("Listener")
                        .HasColumnType("int");

                    b.Property<string>("Lyrics")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<TimeOnly>("Time")
                        .HasColumnType("time");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("TrackId");

                    b.HasIndex("AlbumId");

                    b.HasIndex("ArtistId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Tracks");
                });

            modelBuilder.Entity("BusinessObjects.Track_Playlist", b =>
                {
                    b.Property<Guid>("TrackId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PlaylistId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("CreateDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("date")
                        .HasDefaultValue(new DateOnly(2024, 11, 4));

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.HasKey("TrackId", "PlaylistId");

                    b.HasIndex("PlaylistId");

                    b.ToTable("TrackPlayLists");
                });

            modelBuilder.Entity("BusinessObjects.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasDefaultValueSql("NEWID()");

                    b.Property<DateOnly>("CreateDate")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("date")
                        .HasDefaultValue(new DateOnly(2024, 11, 4));

                    b.Property<DateOnly?>("DOB")
                        .HasColumnType("date");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("Gender")
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Premium")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)")
                        .HasDefaultValue("Free");

                    b.Property<string>("Role")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasDefaultValue("User");

                    b.Property<DateOnly>("UpdateDate")
                        .HasColumnType("date");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("UserName")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("BusinessObjects.User_package", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateOnly>("End_Day")
                        .HasColumnType("date");

                    b.Property<Guid>("PackageId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("PaymentMethod")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateOnly>("Started_Day")
                        .HasColumnType("date");

                    b.Property<string>("TypeOfPremium")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<decimal>("total")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("PackageId");

                    b.HasIndex("UserId");

                    b.ToTable("U_packages");
                });

            modelBuilder.Entity("BusinessObjects.Album", b =>
                {
                    b.HasOne("BusinessObjects.Artist", "Artist")
                        .WithMany("Albums")
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Artist");
                });

            modelBuilder.Entity("BusinessObjects.BlockedArtist", b =>
                {
                    b.HasOne("BusinessObjects.Artist", "Artist")
                        .WithMany("BlockedArtists")
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.User", "User")
                        .WithMany("BlockedArtists")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Artist");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BusinessObjects.Follow", b =>
                {
                    b.HasOne("BusinessObjects.Artist", "Artist")
                        .WithMany("Follow")
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.User", "User")
                        .WithMany("Follow")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Artist");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BusinessObjects.Library", b =>
                {
                    b.HasOne("BusinessObjects.User", "User")
                        .WithOne("Library")
                        .HasForeignKey("BusinessObjects.Library", "UserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("BusinessObjects.Library_Album", b =>
                {
                    b.HasOne("BusinessObjects.Album", "Album")
                        .WithMany("Library_Albums")
                        .HasForeignKey("AlbumId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Library", "Library")
                        .WithMany("Library_Albums")
                        .HasForeignKey("LibraryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Album");

                    b.Navigation("Library");
                });

            modelBuilder.Entity("BusinessObjects.Library_Artist", b =>
                {
                    b.HasOne("BusinessObjects.Artist", "Artist")
                        .WithMany("Library_Artist")
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Library", "Library")
                        .WithMany("Library_Artist")
                        .HasForeignKey("LibraryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Artist");

                    b.Navigation("Library");
                });

            modelBuilder.Entity("BusinessObjects.Library_Playlist", b =>
                {
                    b.HasOne("BusinessObjects.Library", "Library")
                        .WithMany("Library_Playlists")
                        .HasForeignKey("LibraryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Playlist", "Playlist")
                        .WithMany("Library_Playlists")
                        .HasForeignKey("PlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Library");

                    b.Navigation("Playlist");
                });

            modelBuilder.Entity("BusinessObjects.Like", b =>
                {
                    b.HasOne("BusinessObjects.Track", "Track")
                        .WithMany("Likes")
                        .HasForeignKey("TrackId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.User", "User")
                        .WithMany("Likes")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Track");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BusinessObjects.Package_features", b =>
                {
                    b.HasOne("BusinessObjects.Feature", null)
                        .WithMany("PackageFeatures")
                        .HasForeignKey("FeatureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Package", null)
                        .WithMany("Features")
                        .HasForeignKey("PackageId");
                });

            modelBuilder.Entity("BusinessObjects.Payment", b =>
                {
                    b.HasOne("BusinessObjects.User", "User")
                        .WithMany("Payment")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("BusinessObjects.Playlist", b =>
                {
                    b.HasOne("BusinessObjects.User", "User")
                        .WithMany("Playlists")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("User");
                });

            modelBuilder.Entity("BusinessObjects.Track", b =>
                {
                    b.HasOne("BusinessObjects.Album", "Album")
                        .WithMany("Tracks")
                        .HasForeignKey("AlbumId");

                    b.HasOne("BusinessObjects.Artist", "Artist")
                        .WithMany("Tracks")
                        .HasForeignKey("ArtistId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("BusinessObjects.Category", "Category")
                        .WithMany("Tracks")
                        .HasForeignKey("CategoryId");

                    b.Navigation("Album");

                    b.Navigation("Artist");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("BusinessObjects.Track_Playlist", b =>
                {
                    b.HasOne("BusinessObjects.Playlist", "Playlist")
                        .WithMany("TrackPlayLists")
                        .HasForeignKey("PlaylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.Track", "Track")
                        .WithMany("TrackPlayLists")
                        .HasForeignKey("TrackId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Playlist");

                    b.Navigation("Track");
                });

            modelBuilder.Entity("BusinessObjects.User_package", b =>
                {
                    b.HasOne("BusinessObjects.Package", "Package")
                        .WithMany("Packages")
                        .HasForeignKey("PackageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BusinessObjects.User", "User")
                        .WithMany("User_package")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Package");

                    b.Navigation("User");
                });

            modelBuilder.Entity("BusinessObjects.Album", b =>
                {
                    b.Navigation("Library_Albums");

                    b.Navigation("Tracks");
                });

            modelBuilder.Entity("BusinessObjects.Artist", b =>
                {
                    b.Navigation("Albums");

                    b.Navigation("BlockedArtists");

                    b.Navigation("Follow");

                    b.Navigation("Library_Artist");

                    b.Navigation("Tracks");
                });

            modelBuilder.Entity("BusinessObjects.Category", b =>
                {
                    b.Navigation("Tracks");
                });

            modelBuilder.Entity("BusinessObjects.Feature", b =>
                {
                    b.Navigation("PackageFeatures");
                });

            modelBuilder.Entity("BusinessObjects.Library", b =>
                {
                    b.Navigation("Library_Albums");

                    b.Navigation("Library_Artist");

                    b.Navigation("Library_Playlists");
                });

            modelBuilder.Entity("BusinessObjects.Package", b =>
                {
                    b.Navigation("Features");

                    b.Navigation("Packages");
                });

            modelBuilder.Entity("BusinessObjects.Playlist", b =>
                {
                    b.Navigation("Library_Playlists");

                    b.Navigation("TrackPlayLists");
                });

            modelBuilder.Entity("BusinessObjects.Track", b =>
                {
                    b.Navigation("Likes");

                    b.Navigation("TrackPlayLists");
                });

            modelBuilder.Entity("BusinessObjects.User", b =>
                {
                    b.Navigation("BlockedArtists");

                    b.Navigation("Follow");

                    b.Navigation("Library");

                    b.Navigation("Likes");

                    b.Navigation("Payment");

                    b.Navigation("Playlists");

                    b.Navigation("User_package");
                });
#pragma warning restore 612, 618
        }
    }
}
