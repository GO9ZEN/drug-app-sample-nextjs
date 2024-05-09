"use server";

import Database from "better-sqlite3";

const maindbFileName = "app.db";

///////////////////////// INSERT DATA /////////////////////////
export const insertDrugs = async (data: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const stmt = db.prepare(
    "INSERT INTO drugsTable (drugName, drugDescription, drugUsedFor, brand, drugType, quantity, pricePerUnit, expDate, manDate, sideEffects, suggestedAges, warnings, supplierName, supplierNumber) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  );

  const info = stmt.run(
    data.drugName,
    data.drugDescription,
    data.drugUsedFor,
    data.brand,
    data.drugType,
    data.quantity,
    data.pricePerUnit,
    data.expDate,
    data.manDate,
    data.sideEffects,
    data.suggestedAges,
    data.warnings,
    data.supplierName,
    data.supplierNumber
  );

  db.close();
  if (info.changes == 1) {
    return Promise.resolve({
      success: true,
      msg: "Data Saved",
      lastInsertRowid: info.lastInsertRowid,
    });
  } else {
    return Promise.reject({ success: false, msg: "Insert failed" });
  }
};

///////////////////////// GET DATA /////////////////////////
export const getDrugsList = async () => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("SELECT * FROM drugsTable").all();

  db.close();

  return Promise.resolve({
    success: true,
    msg: "All Data Displayed",
    data: res,
  });
};

///////////////////////// GET DATA BY ID /////////////////////////
export const getDrugs = async (id: number) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("SELECT * FROM drugsTable WHERE id = ?").get(id);

  db.close();

  return Promise.resolve({
    success: true,
    msg: "All Data Displayed",
    data: res,
  });
};

///////////////////////// UPDATE DATA BY ID /////////////////////////
export const updateDrugs = async (drugsTable: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  try {
    const res = db
      .prepare(
        "UPDATE drugsTable SET drugName=?, drugDescription=?, drugUsedFor=?, brand=?, drugType=?, quantity=?, pricePerUnit=?, expDate=?, manDate=?, sideEffects=?, suggestedAges=?, warnings=?, supplierName=?, supplierNumber=? WHERE id=?"
      )
      .run(
        drugsTable.drugName,
        drugsTable.drugDescription,
        drugsTable.drugUsedFor,
        drugsTable.brand,
        drugsTable.drugType,
        drugsTable.quantity,
        drugsTable.pricePerUnit,
        drugsTable.expDate,
        drugsTable.manDate,
        drugsTable.sideEffects,
        drugsTable.suggestedAges,
        drugsTable.warnings,
        drugsTable.supplierName,
        drugsTable.supplierNumber,
        drugsTable.id
      );

    db.close();

    return Promise.resolve({
      success: true,
      msg: "All Data Updated",
      data: res,
    });
  } catch (error: any) {
    return Promise.resolve({
      success: false,
      msg: "Data Didn't Updated",
      data: error.message,
    });
  }
};

///////////////////////// DELETE DATA BY ID /////////////////////////
export const deleteDrugsId = async (id: any) => {
  const db = new Database(maindbFileName);
  db.pragma("journal_mode = WAL");

  const res = db.prepare("DELETE FROM drugsTable WHERE id = ?").run(id);

  db.close();

  return Promise.resolve({
    success: true,
    msg: "Data Deleted",
    data: res,
  });
};
