using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Inuranceappbackend.Migrations
{
    public partial class @new : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Policies",
                columns: table => new
                {
                    PolicyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PolicyName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PremiumAmount = table.Column<int>(type: "int", nullable: false),
                    LastPremiumPaid = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NextPremiumdue = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PolicyDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PolicyType = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Policies", x => x.PolicyId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Mobile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "PolicyUsers",
                columns: table => new
                {
                    PolicyUserID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PolicyID = table.Column<int>(type: "int", nullable: false),
                    ID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyUsers", x => x.PolicyUserID);
                    table.ForeignKey(
                        name: "FK_PolicyUsers_Policies_PolicyID",
                        column: x => x.PolicyID,
                        principalTable: "Policies",
                        principalColumn: "PolicyId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PolicyUsers_Users_ID",
                        column: x => x.ID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PolicyUsers_ID",
                table: "PolicyUsers",
                column: "ID");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyUsers_PolicyID",
                table: "PolicyUsers",
                column: "PolicyID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PolicyUsers");

            migrationBuilder.DropTable(
                name: "Policies");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
