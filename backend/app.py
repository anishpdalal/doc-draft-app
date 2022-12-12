from fastapi import FastAPI, Request
from fastapi.responses import FileResponse

import modal

web_app = FastAPI()
stub = modal.Stub("doc-draft")
image = modal.Image.debian_slim().pip_install(["python-docx"])
volume = "document-store"

DOC_DIR = "/docs"


@web_app.post("/generate")
def generate_docx(request: Request):
    import docx
    doc = docx.Document(f"{DOC_DIR}/NVCA-2020-Right-of-First-Refusal-Template.docx")
    
    templates = request.json()

    for template in templates:
        if template["doc"] == "rofr":
            for _, config in template["template"].items():
                paragraph = config["paragraph"]
                run = config["run"]
                start = config["startStr"]
                end = config["endStr"]
                value = config["value"]
                text = doc.paragraphs[paragraph].runs[run].text
                start_index = text.find(start)
                end_index = text.find(end)
                doc.paragraphs[paragraph].runs[run].text = text[0:start_index + len(start) + 1] + value + text[end_index:len(text)]
        doc.save(f"{DOC_DIR}/rofr.docx")
    return {"message": "success"}


@web_app.get("/rofr")
def generate_rofr():
    return FileResponse(
        f"{DOC_DIR}/rofr.docx",
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": "attachment; filename=rofr.docx"},
    )


@stub.asgi(
    image=image,
    shared_volumes={DOC_DIR: modal.Secret.from_name(volume)}
)
def fastapi_app():
    return web_app