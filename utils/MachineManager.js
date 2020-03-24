const os = require('os');
const fs = require('fs');
const uniqid = require('uniqid');
const { sysInfoPath } = require('../config');

//levanta infos da maquina do alvo

class MachineManager {
    static generateId() {
        const systemInfo = {
            uuid: uniqid(),
            infection: Date.now(),
            user: os.userInfo(),
            os: {
                type: os.type(),
                platform: os.platform(),
                architechture: os.arch(),
                release: os.release()
            }
        };
        //escreve localmente
        fs.writeFileSync(sysInfoPath, JSON.stringify(systemInfo));

        return systemInfo;
    }

    static loadId() {
        if (!fs.existsSync(sysInfoPath)) {
            return null;
        }

        var systemInfo = JSON.parse(fs.readFileSync(sysInfoPath));

        if (typeof sysInfoPath != 'object') {
            return null;
        }

        return systemInfo;
    }

    static deleteId() {
        fs.unlinkSync(sysInfoPath);
    }
}

module.exports = MachineManager;