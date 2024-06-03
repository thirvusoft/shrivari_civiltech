frappe.provide('shrivari_civiltech');
frappe.ui.form.on("Supplier", {
  
    refresh: function (frm) {
      header_html_details = `
      
      
      <div class="wrapper"> 
      <div class="tabs_wrap">
      <ul>
        <button style='
                    display: inline-block;
                    outline: 0;
                    border: 0;
                    cursor: pointer;
                    background-color: #4299e1;
                    border-radius: 50px;
                    padding: 4px 16px;
                    font-size: 16px;
                    font-weight: 700;
                    color: white;
                    line-height: 26px;'
                 onclick=
        '
        shrivari_civiltech.preview_file(cur_frm.doc.custom_attachment, cur_frm, "show", "details")
        '
        >View Document</button>
        <button style='
                    display: inline-block;
                    outline: 0;
                    border: 0;
                    cursor: pointer;
                    background-color: #4299e1;
                    border-radius: 50px;
                    padding: 4px 16px;
                    font-size: 16px;
                    font-weight: 700;
                    color: white;
                    line-height: 26px;
                'onclick=
          '
          shrivari_civiltech.preview_file("hide", cur_frm, "hide", "licence")
          '>Hide Preview</button>
        </ul>
      </div>
      </div>`;


      frm
        .get_field("custom_preview_button")
        .$wrapper.html(header_html_details);

      
    }
})

shrivari_civiltech.preview_file = function (file_url, frm, hide) {
  if(hide != 'hide'){
  frm.get_field("custom_preview").$wrapper.html("");
    if (file_url) {
      frappe.db.get_value("File", { file_url: file_url }, "file_type", (r) => {
        if (r["file_type"]) {
          let $preview = "";
          let file_extension = r["file_type"].toLowerCase();

          if (frappe.utils.is_image_file(file_url)) {
            $preview = $(`<div class="img_preview">
                            <img
                                class="img-responsive"
                                src="${frappe.utils.escape_html(file_url)}"
                                onerror="${frm.toggle_display(
                                  "preview",
                                  false
                                )}"
                            />
                        </div>`);
          } else if (frappe.utils.is_video_file(file_url)) {
            $preview = $(`<div class="img_preview">
                            <video width="480" height="320" controls>
                                <source src="${frappe.utils.escape_html(
                                  file_url
                                )}">
                                ${__(
                                  "Your browser does not support the video element."
                                )}
                            </video>
                        </div>`);
          } else if (file_extension === "pdf") {
            $preview = $(`<div class="img_preview">
                            <object style="background:#323639;" width="100%">
                                <embed
                                    style="background:#323639;"
                                    width="100%"
                                    height="540"
                                    src="${frappe.utils.escape_html(
                                      file_url
                                    )}" type="application/pdf"
                                >
                            </object>
                        </div>`);
          } else if (file_extension === "mp3") {
            $preview = $(`<div class="img_preview">
                            <audio width="480" height="60" controls>
                                <source src="${frappe.utils.escape_html(
                                  file_url
                                )}" type="audio/mpeg">
                                ${__(
                                  "Your browser does not support the audio element."
                                )}
                            </audio >
                        </div>`);
          }

          if ($preview) {
            frm
                .get_field("custom_preview")
                .$wrapper.html($preview);
            
          }
        } 
      });
    }
  }
  else{
    frm.get_field("custom_preview").$wrapper.html("");
  }
};