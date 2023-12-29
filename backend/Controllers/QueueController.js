import Queue from "../Models/queueModel.js";

// Pasien mengambil nomor antrian baru
export const takeNumber = async (req, res) => {
  try {
    const latestQueue = await Queue.findOne({
      order: [["createdAt", "DESC"]],
    });

    let nextQueueNumber = 1;

    if (latestQueue && latestQueue.number_queue !== null) {
      nextQueueNumber = latestQueue.number_queue + 1;
    }

    const createdQueue = await Queue.create({
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

// Admin mendapatkan nomor antrian saat ini
export const getCurrentNumber = async (req, res) => {
  try {
    const latestQueue = await Queue.findOne({
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

// Admin memperbarui nomor antrian berikutnya
export const updateNextNumber = async (req, res) => {
  try {
    const latestQueue = await Queue.findOne({
      order: [["createdAt", "DESC"]],
    });

    let nextQueueNumber = 1;

    if (latestQueue && latestQueue.number_queue !== null) {
      nextQueueNumber = latestQueue.number_queue + 1;
    }

    const createdQueue = await Queue.create({
      number_queue: nextQueueNumber,
    });

    res.json({
      number_queue: createdQueue.number_queue,
      message: "Nomor antrian selanjutnya berhasil diperbarui.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat memperbarui nomor antrian selanjutnya.",
    });
  }
};

export const resetQueue = async (req, res) => {
  try {
    await Queue.destroy({
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

// Tambahkan fungsi ini pada controller Anda untuk memungkinkan pasien mengambil nomor antrian baru
// Pasien mengambil nomor antrian baru
export const takeQueueNumber = async (req, res) => {
  try {
    const latestQueue = await Queue.findOne({
      order: [["createdAt", "DESC"]],
    });

    let nextQueueNumber = 1;

    if (latestQueue && latestQueue.number_queue !== null) {
      nextQueueNumber = latestQueue.number_queue + 1;
    }

    const createdQueue = await Queue.create({
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
