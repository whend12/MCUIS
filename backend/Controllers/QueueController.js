import Queue from "../Models/queueModel.js";

//Get Nomor antrian

export const GetQueue = async (req, res) => {
  try {
    const nomorAntrian = await Queue.findOne({
      order: [["createdAt", "DESC"]],
    });
    res.json(nomorAntrian);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mengambil nomor antrian saat ini.",
    });
  }
};

//Nomor antrian untuk pasien, nambah 1 dari nomor antrian sebelumnya, validasi jika nomor antrian sudah ada maka nomor tidak akan tercetak dobule
// fix agar tidak dobule nomor antrian
export const CreateQueue = async (req, res) => {
  try {
    const latestQueue = await Queue.findOne({
      order: [["createdAt", "DESC"]],
    });

    let nextQueueNumber = 1;

    if (latestQueue) {
      nextQueueNumber = latestQueue.number_queque + 1;
    }

    // Tambahkan penundaan selama 2 detik sebelum membuat antrian selanjutnya
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const queue = await Queue.create({
      number_queque: nextQueueNumber,
    });

    res.json(queue);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat membuat nomor antrian baru.",
    });
  }
};

//reset queue number ke 0 kembali
export const ResetQueue = async (req, res) => {
  try {
    const reset = await Queue.destroy({
      where: {},
      truncate: true,
    });
    res.json(reset);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat menghapus nomor antrian saat ini.",
    });
  }
};

//fungsi Next untuk meng get nomor antrian selanjutnya
export const NextQueue = async (req, res) => {
  try {
    // Mengambil nomor antrian terbaru
    const latestQueue = await Queue.findOne({
      order: [["createdAt", "DESC"]],
    });

    let nextQueueNumber = 1; // Inisialisasi nomor antrian selanjutnya

    if (latestQueue) {
      // Jika ada nomor antrian terbaru, tambahkan 1 untuk mendapatkan nomor antrian selanjutnya
      nextQueueNumber = latestQueue.number_queque + 1;
    }

    //Dimulai dari 1
    const queue = await Queue.create({
      number_queque: nextQueueNumber,
    });

    res.json({ nextQueueNumber });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mengambil nomor antrian selanjutnya.",
    });
  }
};
