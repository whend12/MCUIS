import QueuePatient from "../Models/QueuePatientModal.js";

// Pasien mengambil nomor antrian baru
export const takeQueueNumber = async (req, res) => {
  try {
    const latestQueue = await QueuePatient.findOne({
      order: [["createdAt", "DESC"]],
    });

    let nextQueueNumber = 1;

    if (latestQueue && latestQueue.number_queue !== null) {
      nextQueueNumber = latestQueue.number_queue + 1;
    }

    const createdQueue = await QueuePatient.create({
      number_queue: nextQueueNumber,
    });

    res.json({ number_queue: createdQueue.number_queue });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mengambil nomor antrian baru.",
    });
  }
};

export const getQueueNumber = async (req, res) => {
  try {
    const latestQueue = await QueuePatient.findOne({
      order: [["createdAt", "DESC"]],
    });

    let nextQueueNumber = 1;

    if (latestQueue && latestQueue.number_queue !== null) {
      nextQueueNumber = latestQueue.number_queue;
    }

    res.json({ number_queue: nextQueueNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mendapatkan nomor antrian.",
    });
  }
};

//reset antrian

export const resetQueue = async (req, res) => {
  try {
    await QueuePatient.destroy({
      truncate: true,
      where: {},
    });

    res.json({ message: "Nomor antrian berhasil direset." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mereset nomor antrian.",
    });
  }
};
