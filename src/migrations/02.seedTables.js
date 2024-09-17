import "dotenv/config";
import {
  User,
  BankAccount,
  Transaction,
  Category,
  Budget,
  Notification, // N'oubliez pas d'importer le modèle Notification
  sequelize,
} from "../models/index.js";
import { hash } from "../auth/scrypt.js";

async function seedDatabase() {
  console.log("🔄 Seeding started...");

  try {
    // Synchroniser les modèles avec la base de données
    await sequelize.sync({ force: true });

    // Créer un utilisateur
    const users = await User.bulkCreate([
      {
        firstName: "Jérôme",
        lastName: "Bouteyre",
        email: "jerome@clock.com",
        password: await hash("password123"),
        profilPicture: "/uploads/logo.png",
      },
    ]);

    console.log("User created:", users[0].toJSON());

    // Créer des catégories
    const categories = await Category.bulkCreate([
      { name_category: "Alimentation", logo: "alimentation.png" }, // ID 1
      { name_category: "Logement", logo: "logement.png" }, // ID 2
      { name_category: "Loisirs", logo: "loisirs.png" }, // ID 3
      { name_category: "Santé", logo: "sante.png" }, // ID 4
      { name_category: "Transport", logo: "transport.png" }, // ID 5
      { name_category: "Divertissement", logo: "divertissement.png" }, // ID 6
      { name_category: "Autre", logo: "autre.png" }, // ID 7
    ]);

    // Créer un compte bancaire pour Jérôme
    const bankAccount = await BankAccount.create({
      name: "Jérôme Bouteyre",
      initial_balance: 645.0,
      id_user: users[0].id,
    });

    // Créer des transactions rigolotes pour Jérôme
    const transactionsData = [
      {
        transaction_type: "debit",
        amount: 15.0,
        transaction_date: new Date("2024-01-10"),
        description: "Abonnement OnlyFans",
        id_category: categories[5].id, // Divertissement
      },
      {
        transaction_type: "debit",
        amount: 50.0,
        transaction_date: new Date("2024-02-14"),
        description: "Abonnement MYM",
        id_category: categories[5].id, // Divertissement
      },
      {
        transaction_type: "debit",
        amount: 20.0,
        transaction_date: new Date("2024-03-03"),
        description: "Achat de cannabis",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "debit",
        amount: 100.0,
        transaction_date: new Date("2024-04-21"),
        description: "Dépense pour un voyage en Lune de Miel",
        id_category: categories[2].id, // Loisirs
      },
      {
        transaction_type: "debit",
        amount: 5.0,
        transaction_date: new Date("2024-05-09"),
        description: "Café avec des amis",
        id_category: categories[0].id, // Alimentation
      },
      {
        transaction_type: "debit",
        amount: 200.0,
        transaction_date: new Date("2024-06-15"),
        description: "Concert de musique live",
        id_category: categories[2].id, // Loisirs
      },
      {
        transaction_type: "debit",
        amount: 300.0,
        transaction_date: new Date("2024-07-23"),
        description: "Dépense pour un gadget inutile",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "credit",
        amount: 500.0,
        transaction_date: new Date("2024-01-15"),
        description: "Revenu Freelance",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "credit",
        amount: 200.0,
        transaction_date: new Date("2024-06-30"),
        description: "Prime de performance",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "credit",
        amount: 100.0,
        transaction_date: new Date("2024-12-05"),
        description: "Bonus de fin d'année",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "debit",
        amount: 10.0,
        transaction_date: new Date("2024-08-14"),
        description: "Magazines spécialisés",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "debit",
        amount: 40.0,
        transaction_date: new Date("2024-09-18"),
        description: "Dépense pour un costume extravagant",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "debit",
        amount: 20.0,
        transaction_date: new Date("2024-09-18"),
        description: "Chat GPT 4.0",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "debit",
        amount: 80.0,
        transaction_date: new Date("2024-10-10"),
        description: "Entrée au musée des horreurs",
        id_category: categories[2].id, // Loisirs
      },
      {
        transaction_type: "credit",
        amount: 500.0,
        transaction_date: new Date("2024-01-15"),
        description: "Revenu Freelance",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "credit",
        amount: 200.0,
        transaction_date: new Date("2024-06-30"),
        description: "Prime de performance",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "credit",
        amount: 100.0,
        transaction_date: new Date("2024-12-05"),
        description: "Bonus de fin d'année",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "debit",
        amount: 60.0,
        transaction_date: new Date("2024-11-05"),
        description: "Régime alimentaire bizarre",
        id_category: categories[0].id, // Alimentation
      },
      {
        transaction_type: "debit",
        amount: 75.0,
        transaction_date: new Date("2024-12-20"),
        description: "Décoration de Noël extravagante",
        id_category: categories[2].id, // Loisirs
      },
      // Transactions supplémentaires
      {
        transaction_type: "debit",
        amount: 25.0,
        transaction_date: new Date("2024-01-25"),
        description: "Dépense pour des chaussettes funky",
        id_category: categories[2].id, // Loisirs
      },
      {
        transaction_type: "debit",
        amount: 35.0,
        transaction_date: new Date("2024-02-28"),
        description: "Achat de jouets pour animaux",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "debit",
        amount: 55.0,
        transaction_date: new Date("2024-03-22"),
        description: "Dépense pour un spectacle de magie",
        id_category: categories[2].id, // Loisirs
      },
      {
        transaction_type: "debit",
        amount: 95.0,
        transaction_date: new Date("2024-04-17"),
        description: "Escape room avec des amis",
        id_category: categories[2].id, // Loisirs
      },
      {
        transaction_type: "debit",
        amount: 120.0,
        transaction_date: new Date("2024-05-25"),
        description: "Achat d'un costume de super-héros",
        id_category: categories[2].id, // Loisirs
      },
      {
        transaction_type: "debit",
        amount: 30.0,
        transaction_date: new Date("2024-06-07"),
        description: "Abonnement à une box mensuelle",
        id_category: categories[5].id, // Divertissement
      },
      {
        transaction_type: "debit",
        amount: 65.0,
        transaction_date: new Date("2024-07-11"),
        description: "Dépense pour un atelier de cuisine",
        id_category: categories[0].id, // Alimentation
      },
      {
        transaction_type: "debit",
        amount: 45.0,
        transaction_date: new Date("2024-08-16"),
        description: "Visite d'un parc d'attractions",
        id_category: categories[2].id, // Loisirs
      },
      {
        transaction_type: "debit",
        amount: 90.0,
        transaction_date: new Date("2024-09-08"),
        description: "Réparation de voiture",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "debit",
        amount: 110.0,
        transaction_date: new Date("2024-10-12"),
        description: "Dépense pour un abonnement de streaming",
        id_category: categories[5].id, // Divertissement
      },
      {
        transaction_type: "debit",
        amount: 50.0,
        transaction_date: new Date("2024-11-22"),
        description: "Achat de gadgets pour la maison",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "debit",
        amount: 80.0,
        transaction_date: new Date("2024-12-15"),
        description: "Dépense pour une fête d'anniversaire",
        id_category: categories[2].id, // Loisirs
      },
      // Crédits supplémentaires
      {
        transaction_type: "credit",
        amount: 500.0,
        transaction_date: new Date("2024-01-15"),
        description: "Revenu Freelance",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "credit",
        amount: 200.0,
        transaction_date: new Date("2024-06-30"),
        description: "Prime de performance",
        id_category: categories[6].id, // Autre
      },
      {
        transaction_type: "credit",
        amount: 100.0,
        transaction_date: new Date("2024-12-05"),
        description: "Bonus de fin d'année",
        id_category: categories[6].id, // Autre
      },
    ];

    await Transaction.bulkCreate(
      transactionsData.map((transaction) => ({
        ...transaction,
        id_bank_account: bankAccount.id,
      }))
    );

    // Créer des budgets associés aux catégories
    const budgets = await Budget.bulkCreate([
      {
        limitAmount: 500,
        id_category: categories[0].id,
        id_bank_account: bankAccount.id,
      },
      {
        limitAmount: 1500,
        id_category: categories[1].id,
        id_bank_account: bankAccount.id,
      },
      {
        limitAmount: 1000,
        id_category: categories[2].id,
        id_bank_account: bankAccount.id,
      },
      {
        limitAmount: 500,
        id_category: categories[3].id,
        id_bank_account: bankAccount.id,
      },
      {
        limitAmount: 300,
        id_category: categories[4].id,
        id_bank_account: bankAccount.id,
      },
      {
        limitAmount: 300,
        id_category: categories[5].id,
        id_bank_account: bankAccount.id,
      },
      {
        limitAmount: 200,
        id_category: categories[6].id,
        id_bank_account: bankAccount.id,
      },
    ]);

    console.log("✅ Seeding completed! Database is ready.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    // Fermer la connexion à la base de données
    await sequelize.close();
    console.log("💤 Database connection closed.");
  }
}

// Exécuter la fonction de peuplement de la base de données
seedDatabase();
