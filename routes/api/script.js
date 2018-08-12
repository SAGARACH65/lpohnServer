let peer = new Peer('sagarxx');

let s = document.getElementById('a');
s.innerHTML = 'sagar123';
//code to send information
(function ($) {
    $('#done-button').on('click', function () {
        let file = $('#a')[0].files[0];

        let con = peer.connect('acharyaxx', {
            label: "file",
            reliable: true,
            serialization: "none"
        });

        let fileSize = file.size;
        let name = file.name;
        let mime = file.type;
        let chunkSize = 64 * 1024; // bytes
        let offset = 0;

        console.log(fileSize + "  " + name + "  " + mime);

        con.on('open', function () {
            //  have conn.id
            con.send(fileSize);
        });
        con.on('open', function () {
            //  have conn.id

            con.send(file.name);
        });

        function readChunk() {
            let r = new FileReader();
            let blob = file.slice(offset, chunkSize + offset);
            r.onload = function (evt) {
                if (!evt.target.error) {
                    offset += chunkSize;
                    console.log("sending: " + (offset / fileSize) * 100 + "%");
                    if (offset >= fileSize) {
                        con.on('open', function () {
                            // here you have conn.id
                            con.send(evt.target.result);
                        });
                        console.log("Done reading file " + name + " " + mime);
                        return;
                    } else {
                        con.on('open', function () {
                            // here you have conn.id
                            con.send(evt.target.result);
                        });

                    }
                } else {
                    console.log("Read error: " + evt.target.error);
                    return;
                }
                readChunk();
            };
            r.readAsArrayBuffer(blob);
        }

        readChunk();

    });
})(jQuery);

// let peer = new Peer('acharya');

let dataOrg = [];
console.log(peer);
let x = document.getElementById('a');
x.innerHTML = 'sagar';
let count = 0, fileSize = 0, fileType = '';
peer.on('connection', function (conn) {
    console.log(conn);
    conn.on('data', function (data) {
        if (count === 0) {
            fileSize = data;
            console.log("filesize" + Math.ceil(fileSize / (64 * 1024)));
        }
        else if (count === 1) {
            fileType = data;
            console.log(fileType);
        }
        else {

            dataOrg.push(data);
            console.log(dataOrg);
        }

        count++;

        if (dataOrg.length >= Math.ceil(fileSize / (64 * 1024))) {
            count = 0;
            let s = document.getElementById('a');
            s.innerHTML = dataOrg;

            let blob = new window.Blob(dataOrg);
            let anchor = document.createElement('a');
            anchor.href = URL.createObjectURL(blob);
            anchor.download = fileType;
            anchor.textContent = 'XXXXXXX';
            anchor.style.display = 'none';
            document.body.appendChild(anchor);
            dataOrg = [];
            if (anchor.click) {
                anchor.click();

            } else {
                let evt = document.createEvent('MouseEvents');
                evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                anchor.dispatchEvent(evt);
            }

        }

    });

});

